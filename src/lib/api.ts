"use server";

import { redirect } from "next/navigation";

import type { Database } from "~types/supabase";

import { createServerActionSupabase, getServerActionSession } from "./supabase/server-action";
import { createServerComponentSupabase, getServerComponentSession } from "./supabase/server-component";

export const getRequestedOrders = async () => {
  const supabase = createServerComponentSupabase();

  return supabase.from("orders").select("*").eq("status", "На розгляданні").order("created_at", {
    ascending: false,
  });
};

export const getAllOrders = async () => {
  const supabase = createServerComponentSupabase();

  return supabase.from("orders").select("*").order("created_at", {
    ascending: false,
  });
};

export const getAllUserOrders = async () => {
  const supabase = createServerComponentSupabase();

  const session = await getServerComponentSession();

  if (!session) {
    redirect("/login");
  }

  return supabase.from("orders").select("*").eq("user_id", session.user.id).order("created_at", {
    ascending: false,
  });
};

export const createOrderAction = async (data: Omit<Database["public"]["Tables"]["orders"]["Insert"], "user_id">) => {
  const supabase = createServerActionSupabase();

  const session = await getServerActionSession();

  if (!session) {
    redirect("/login");
  }

  await createCustomerAction({
    id: session.user.id,
    name: data.customer,
    email: session.user.email || "",
    phone: data.phone,
  });

  return supabase.from("orders").insert({
    user_id: session.user.id,
    ...data,
  });
};

export const deleteOrderAction = async (id: string) => {
  const supabase = createServerActionSupabase();

  return supabase.from("orders").delete().eq("id", id);
};

export const acceptOrderAction = async (id: string) => {
  const supabase = createServerActionSupabase();

  return supabase
    .from("orders")
    .update({
      status: "Підтверджено",
    })
    .eq("id", id);
};

export const declineOrderAction = async (id: string) => {
  const supabase = createServerActionSupabase();

  return supabase
    .from("orders")
    .update({
      status: "Скасовано",
    })
    .eq("id", id);
};

export const completeOrderAction = async (id: string) => {
  const supabase = createServerActionSupabase();

  return supabase
    .from("orders")
    .update({
      status: "Виконано",
    })
    .eq("id", id);
};

export const getAllCustomers = async () => {
  const supabase = createServerComponentSupabase();

  return supabase.from("customers").select("*").order("created_at", {
    ascending: false,
  });
};

export const createCustomerAction = async (data: Database["public"]["Tables"]["customers"]["Insert"]) => {
  const supabase = createServerActionSupabase();

  return supabase.from("customers").upsert(data);
};
