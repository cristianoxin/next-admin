import { NextResponse } from "next/server";
import query from "@/server/db";
import { spliceRequestParams } from "@/common/tool";

export const GET = async(request) => {
	const sql = "select department.*, hospital.name as hospital_name from department left join hospital on hospital_id = hospital.id";
	const responseData = await query(sql);
	return NextResponse.json({ data: responseData },{ status: 200 });
}

export const POST = async(request, content) => {
	const params = await request.json();
	const requestParams = spliceRequestParams(params);
	const sql = params.id ? `update department set ${ requestParams } where id=${ params.id }` : `insert into department set ${ requestParams }`;
	await query(sql);
	return NextResponse.json({  },{ status: 200 });
}
