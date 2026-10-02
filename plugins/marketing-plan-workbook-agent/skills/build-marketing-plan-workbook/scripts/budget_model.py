#!/usr/bin/env python3
"""Strategy Profile budget model for LF foundation marketing plans.

Usage:
  python budget_model.py --revenue 4075000 [--services 0.6 --content 0.2 --discretionary 0.2] [--json]

Prints the three Strategy Profile columns (Conservative 12%, Aggressive 20%,
Hyper-Growth 30% of revenue; paid share 30/40/50% of total), splits the
remainder into LF services/headcount, third-party content and discretionary
reserve, and adds the flat-pricing fee cross-check. Percentages come from the
LF_Marketing_Services_Matrix sheet; pass overrides if the sheet changes.
"""
import argparse, json

PROFILES = [
    ("Conservative Growth", 0.12, 0.30),
    ("Aggressive Scale", 0.20, 0.40),
    ("Hyper-Growth", 0.30, 0.50),
]

def flat_fee(revenue):
    if revenue < 500_000:
        return 0, "Marketing OS (< $500K): $0, funded from G&A"
    if revenue <= 1_000_000:
        return 75_000 + 0.04 * revenue, "LF Marketing Program ($500K–$1M): $75K + 4%"
    if revenue <= 3_000_000:
        return 150_000 + 0.04 * revenue, "LF Marketing Program ($1M–$3M): $150K + 4%"
    return min(300_000 + 0.04 * revenue, 600_000), "LF Marketing Department (> $3M): $300K + 4%, cap $600K"

def model(revenue, services=0.6, content=0.2, discretionary=0.2):
    assert abs(services + content + discretionary - 1) < 1e-6, "remainder split must sum to 1"
    fee, fee_rule = flat_fee(revenue)
    cols = []
    for name, pct, paid_share in PROFILES:
        total = revenue * pct
        paid = total * paid_share
        rem = total - paid
        cols.append({
            "profile": name, "pct_of_revenue": pct, "paid_share": paid_share,
            "total": round(total), "paid": round(paid), "remainder": round(rem),
            "lf_services": round(rem * services), "third_party_content": round(rem * content),
            "discretionary": round(rem * discretionary),
            "planned_campaign_spend": round(paid + rem * content),
            "fee_exceeds_services": fee > rem * services,
        })
    return {"revenue": revenue, "flat_fee": round(fee), "flat_fee_rule": fee_rule,
            "remainder_split": {"lf_services": services, "third_party_content": content, "discretionary": discretionary},
            "profiles": cols}

def fmt(n):
    return f"${n:,.0f}"

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--revenue", type=float, required=True)
    ap.add_argument("--services", type=float, default=0.6)
    ap.add_argument("--content", type=float, default=0.2)
    ap.add_argument("--discretionary", type=float, default=0.2)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    m = model(a.revenue, a.services, a.content, a.discretionary)
    if a.json:
        print(json.dumps(m, indent=2)); raise SystemExit
    print(f"Revenue base: {fmt(m['revenue'])}   Flat-pricing fee: {fmt(m['flat_fee'])} ({m['flat_fee_rule']})")
    hdr = ["", *[c["profile"] for c in m["profiles"]]]
    rows = [
        ["Total (% of revenue)", *[f"{fmt(c['total'])} ({c['pct_of_revenue']:.0%})" for c in m["profiles"]]],
        ["Paid spend", *[f"{fmt(c['paid'])} ({c['paid_share']:.0%} of total)" for c in m["profiles"]]],
        ["Remainder", *[fmt(c["remainder"]) for c in m["profiles"]]],
        [f"LF services/headcount ({m['remainder_split']['lf_services']:.0%})", *[fmt(c["lf_services"]) for c in m["profiles"]]],
        [f"Third-party content ({m['remainder_split']['third_party_content']:.0%})", *[fmt(c["third_party_content"]) for c in m["profiles"]]],
        [f"Discretionary reserve ({m['remainder_split']['discretionary']:.0%})", *[fmt(c["discretionary"]) for c in m["profiles"]]],
        ["Planned campaign spend (paid + content)", *[fmt(c["planned_campaign_spend"]) for c in m["profiles"]]],
        ["Flat fee exceeds services bucket?", *["YES — reconcile" if c["fee_exceeds_services"] else "no" for c in m["profiles"]]],
    ]
    w = [max(len(str(r[i])) for r in [hdr, *rows]) for i in range(4)]
    for r in [hdr, *rows]:
        print("  ".join(str(r[i]).ljust(w[i]) for i in range(4)))
