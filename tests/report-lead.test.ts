// A daily's front-page picture comes from the item its lead is about: the editors' lead matched to an
// item by title, never simply the first highlight.
import "./setup.ts";
import assert from "node:assert/strict";
import { test } from "node:test";
import type { ReportCitation } from "@aihot/contracts/site";
import { leadItemOf } from "@aihot/backend/publication/reports";

const cite = (itemId: string, title: string) => ({ itemId, title }) as ReportCitation;
const arena = cite("a", "《天际》以 Metacritic 94 分登顶本周主机新作榜首");
const valve = cite("b", "Valve 宣布旗舰新作延期，并披露线上服务遭遇大规模作弊与账号安全事件");

test("an editors' lead is matched to the item it is written about", () => {
  assert.equal(leadItemOf("Valve 宣布旗舰新作延期并披露线上安全事件", [arena, valve], [arena, valve])?.itemId, "b");
});

test("a lead that matches no item clearly has no item", () => {
  assert.equal(leadItemOf("多家公司发布新作，行业竞争加剧", [arena], [arena, valve]), undefined);
});

test("without an editors' lead the first highlight leads", () => {
  assert.equal(leadItemOf(undefined, [arena], [valve, arena])?.itemId, "a");
});
