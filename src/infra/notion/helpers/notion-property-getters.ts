import { Tag } from "@/domain/entities/types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Helper to safely get property values
export const getTitle = (page: PageObjectResponse, property: string): string => {
  const prop = page.properties[property];
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title[0].plain_text;
  }
  return "Untitled";
};

export const getRichText = (page: PageObjectResponse, property: string): string => {
  const prop = page.properties[property];
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    return prop.rich_text[0].plain_text;
  }
  return "";
};

export const getMultiSelect = (page: PageObjectResponse, property: string): string[] => {
  const prop = page.properties[property];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((item) => item.name);
  }
  return [];
};


export const getTags = (page: PageObjectResponse, property: string): Tag[] => {
  const prop = page.properties[property];

  if (prop?.type !== "multi_select") {
    return [];
  }

  return prop.multi_select.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
  }));
};

export const getUrl = (page: PageObjectResponse, property: string): string | undefined => {
  const prop = page.properties[property];
  if (prop?.type === "url") {
    return prop.url || undefined;
  }
  return undefined;
};

export const getDate = (page: PageObjectResponse, property: string): string => {
  const prop = page.properties[property];
  if (prop?.type === "date" && prop.date) {
    return prop.date.start;
  }
  return new Date().toISOString();
};

export const getCover = (page: PageObjectResponse): string | undefined => {
  if (page.cover?.type === "external") {
    return page.cover.external.url;
  }
  if (page.cover?.type === "file") {
    return page.cover.file.url;
  }
  return undefined;
};



export const getFiles = (page: PageObjectResponse, property: string): string[] => {
  const prop = page.properties[property];

  if (prop?.type !== "files") {
    return [];
  }

  return prop.files
    .map((file) => {
      if (file.type === "external") {
        return file.external.url;
      }

      if (file.type === "file") {
        return file.file.url; // Notion-uploaded: signed URL (refresh with SSR/revalidate)
      }

      return undefined;
    })
    .filter((url): url is string => typeof url === "string" && url.length > 0);
};

export const getFile = (
  page: PageObjectResponse,
  property: string,
): string | undefined => {
  const prop = page.properties[property];

  if (prop?.type !== "files" || prop.files.length === 0) {
    return undefined;
  }

  const file = prop.files[0];

  if (file.type === "external") {
    return file.external.url || undefined;
  }

  if (file.type === "file") {
    return file.file.url || undefined;
  }

  return undefined;
};