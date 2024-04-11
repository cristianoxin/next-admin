"use client"
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import DepartmentForm from "./component/DepartmentForm";

import request from "@/server/request";

const DepartmentTable = ({ dataSource, loading, onAdd, onEdit }) => {
	const columns = [{
		title: "医院全称",
		dataIndex: "hospital_name"
	},{
		title: "科室全称",
		dataIndex: "name"
	},{
		title: "操作",
		dataIndex: "id",
		render: (text, record) => {
			return (
				<div>
					<Button type="primary" onClick={ () => { onEdit(record) }}>
						编辑
					</Button>
					<Button className="margin-left-smaller">
						删除
					</Button>
				</div>
			);
		}
	}];

	return (
		<>
			<div>
				<Button type="primary" onClick={ onAdd }>
					新增
				</Button>
			</div>
			<div className="margin-top-small">
				<Table dataSource={ dataSource } columns={ columns } loading={ loading } rowKey={ (record) => { return record.id }} size="small" />
			</div>
		</>
	);
}

const Department = () => {
	const [ dataSource, setDataSource ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ visible, setVisible ] = useState(false);
	const [ entity, setEntity ] = useState(null);
	const [ hospitalList, setHospitalList ] = useState([]);

	const getData = async() => {
		try {
			setLoading(true);

			const responseData = await request({
				url : "/api/department"
			});

			setDataSource(responseData.data);
		}
		finally {
			setLoading(false);
		}
	}

	const getHospitalList = async() => {
		const responseData = await request({
			url : "/api/hospital"
		});

		setHospitalList(responseData.data);
	}

	useEffect(
		() => {
			getData();
			getHospitalList();
		}, []
	)

	const openModal = () => {
		setVisible(true);
	}

	const closeModal = () => {
		setVisible(false);
	}

	const onSubmit = async(values) => {
		console.log(values);

		await request({
			url : "/api/department",
			method : "POST",
			params: values
		});
	}

	const onAdd = () => {
		setEntity(null);
		openModal();
	}

	const onEdit = (record) => {
		setEntity(record);
		openModal();
	}

	return (
		<div>
			<div>
				<DepartmentTable dataSource={ dataSource } loading={ loading } onAdd={ onAdd } onEdit={ onEdit } />
			</div>
			<Modal title="科室管理" footer={ null } open={ visible } destroyOnClose={ true } onCancel={ closeModal }>
				<DepartmentForm dataSource={ entity } hospitalList={ hospitalList } onSubmit={ onSubmit } onClose={ closeModal } />
			</Modal>
		</div>
	);
}

export default Department;