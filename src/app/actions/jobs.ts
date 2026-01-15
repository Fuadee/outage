"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { isJobStatus, STATUSES } from "@/lib/types";

export async function createOutageJob(formData: FormData) {
  const supabase = createServerClient();
  const title = String(formData.get("title") ?? "");
  const areaGroup = String(formData.get("area_group") ?? "");
  const startTime = formData.get("start_time")?.toString() || null;
  const endTime = formData.get("end_time")?.toString() || null;
  const statusInput = String(formData.get("status") ?? STATUSES[0]);
  const status = isJobStatus(statusInput) ? statusInput : STATUSES[0];

  if (!title || !areaGroup) {
    return;
  }

  await supabase.from("outage_jobs").insert({
    title,
    status,
    area_group: areaGroup,
    start_time: startTime,
    end_time: endTime
  });

  revalidatePath("/dashboard");
}
