"use client"
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import HospitalForm from "./component/HospitalForm";

import request from "@/server/request";

const HospitalTable = ({ dataSource, loading, onAdd, onEdit }) => {
	const columns = [{
		title: "医院全称",
		dataIndex: "name"
	},{
		title: "医院等级",
		dataIndex: "rating"
	},{
		title: "省，市，区",
		dataIndex: "region"
	},{
		title: "操作",
		dataIndex: "id",
		render: (text, record) => {
			return (
				<div>
					<Button type="primary" onClick={ () => { onEdit(record) } }>
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

const Hospital = () => {
	const [ dataSource, setDataSource ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ visible, setVisible ] = useState(false);
	const [ entity, setEntity ] = useState(null);

	useEffect(
		() => {
			getData();
		}, []
	)

	const getData = async() => {
		try {
			setLoading(true);

			const responseData = await request({
				url : "/api/hospital"
			});

			setDataSource(responseData.data);
		}
		finally {
			setLoading(false);
		}
	}

	const onSubmit = async(values) => {
		await request({
			url : "/api/hospital",
			method : "POST",
			params: values
		});
	}

	const openModal = () => {
		setVisible(true);
	}

	const closeModal = () => {
		setVisible(false);
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
				<HospitalTable dataSource={ dataSource } loading={ loading } onAdd={ onAdd } onEdit={ onEdit } />
			</div>
			<Modal title="医院管理" footer={ null } open={ visible } destroyOnClose={ true } onCancel={ closeModal }>
				<HospitalForm dataSource={ entity } onSubmit={ onSubmit } onClose={ closeModal } />
			</Modal>
		</div>
	)
}

export default Hospital;