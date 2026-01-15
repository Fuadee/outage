import { NextResponse } from "next/server";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/server";
import { STATUSES } from "@/lib/types";

export async function GET() {
  const supabase = getSupabaseRouteHandlerClient();
  const { data, error } = await supabase
    .from("outage_jobs")
    .select("id,title,status,area_group,start_time,end_time,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = getSupabaseRouteHandlerClient();
  const body = (await request.json()) as {
    title?: string;
    area_group?: string;
    start_time?: string | null;
    end_time?: string | null;
    status?: string;
  };

  if (!body.title || !body.area_group) {
    return NextResponse.json({ error: "Missing title or area_group" }, { status: 400 });
  }

  const status = STATUSES.includes(body.status ?? "")
    ? body.status
    : STATUSES[0];

  const { data, error } = await supabase
    .from("outage_jobs")
    .insert({
      title: body.title,
      area_group: body.area_group,
      start_time: body.start_time ?? null,
      end_time: body.end_time ?? null,
      status
    })
    .select("id,title,status,area_group,start_time,end_time,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
