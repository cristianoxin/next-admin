import { NextResponse } from "next/server";
import query from "@/server/db";
import { spliceRequestParams } from "@/common/tool";

export const GET = async(request) => {
	const sql = "select * from hospital";
	const responseData = await query(sql);
	return NextResponse.json({ data: responseData },{ status: 200 });
}

export const POST = async(request, content) => {
	const params = await request.json();
	const requestParams = spliceRequestParams(params);
	const sql = `insert into hospital set ${ requestParams }`;
	await query(sql);
	return NextResponse.json({  },{ status: 200 });
}