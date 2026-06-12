# Plant_Playground

The sandbox **world** of [fractal-node-core](https://github.com/OnliestWizard/fractal-node-core) —
a graph execution engine whose LLM-designed, contract-tested graphs do their
real work here. This repo is the system's persistent memory: every issue,
commit, and file is something the system did, proposed, or was asked to do.

**Start with the garden report: [STATUS.md](STATUS.md)** — regenerated from
the skill library on disk. Nothing in it is hand-maintained.

- `planted/` — artifacts delivered by graphs (code, docs, haikus)
- `proposals/` — features the system proposed for itself, linked to their issues
- `probes/` — where contract tests are allowed to have side effects
- **Issues** — the work queue: specs go in, evidence comes back as comments.
  A GitHub Actions pulse sweeps it unattended; `plant:*` labels are the
  state machine.

Humans decide; the system proposes and delivers, with receipts. The
unattended lane runs under a
[constitution](https://github.com/OnliestWizard/fractal-node-core/blob/main/CONSTITUTION.md):
this README, the workflows, and the law itself are human-only territory —
the system's own tool pool refuses to write here, before the request ever
reaches the network.

(Yes, this README has been clobbered before — by a deliberately sabotaged
graph in a demo, then repaired by the rolled-back version of the same tool.
That was the point. It can't happen unattended anymore; also the point.
This very edit was delivered through the owner lane by the same graph that
was constitutionally refused minutes earlier in the governed lane — both
runs kept their receipts.)
