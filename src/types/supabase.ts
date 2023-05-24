export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
      };
      customers: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string;
          phone: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          name: string;
          phone: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          phone?: string;
        };
      };
      orders: {
        Row: {
          address: string;
          car: string;
          created_at: string;
          customer: string;
          date: string;
          id: string;
          phone: string;
          services: Json;
          status: string;
          total_price: number;
          user_id: string;
        };
        Insert: {
          address: string;
          car: string;
          created_at?: string;
          customer: string;
          date: string;
          id?: string;
          phone: string;
          services: Json;
          status: string;
          total_price: number;
          user_id: string;
        };
        Update: {
          address?: string;
          car?: string;
          created_at?: string;
          customer?: string;
          date?: string;
          id?: string;
          phone?: string;
          services?: Json;
          status?: string;
          total_price?: number;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
