"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssuesChart({ open, inProgress, closed }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <ResponsiveContainer width="100%" height={300} className="relative right-8">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Bar dataKey="value" barSize={20} style={{ fill: "var(--accent-9)" }} radius={5} />
      </BarChart>
    </ResponsiveContainer>
  );
}
