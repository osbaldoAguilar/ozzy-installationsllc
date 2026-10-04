CREATE TYPE "public"."installation_type" AS ENUM('new_construction', 'remodel', 'commercial_construction');--> statement-breakpoint
CREATE TYPE "public"."lead_source" AS ENUM('form', 'chatbot');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'scheduled', 'closed');--> statement-breakpoint
CREATE TYPE "public"."service_subtype" AS ENUM('direct_vent', 'thru_roof', 'thru_chase', 'vent_free', 'brick_mortar');--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('fireplace_installation', 'chimney_cap', 'hearth_mantel', 'service_call', 'other_services');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"service_type" "service_type" NOT NULL,
	"service_subtype" "service_subtype",
	"installation_type" "installation_type",
	"message" text,
	"photo_urls" text[] DEFAULT '{}' NOT NULL,
	"source" "lead_source" DEFAULT 'form' NOT NULL,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
