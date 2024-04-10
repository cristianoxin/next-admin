"use client"
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";

import request from "@/server/request";

const DoctorTable = ({ dataSource, loading, onAdd, onEdit }) => {
	const columns = [{
		title: "所属医院",
		dataIndex: ""
	},{
		title: "所属科室",
		dataIndex: ""
	},{
		title: "医生姓名",
		dataIndex: ""
	},{
		title: "医生性别",
		dataIndex: ""
	},{
		title: "医生头像",
		dataIndex: ""
	},{
		title: "执业证书",
		dataIndex: ""
	},{
		title: "职称证书",
		dataIndex: ""
	},{
		title: "医生简介",
		dataIndex: ""
	},{
		title: "医生擅长",
		dataIndex: ""
	},{
		title: "医生获奖和成绩",
		dataIndex: ""
	},{
		title: "操作",
		dataIndex: "id",
		render: (text) => {
			return (
				<div>
					<Button type="primary" onClick={ onEdit }>
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

const Doctor = () => {
	const [ dataSource, setDataSource ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ visible, setVisible ] = useState(false);
	const [ entity, setEntity ] = useState(null);

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
				<DoctorTable dataSource={ dataSource } loading={ loading } onAdd={ onAdd } onEdit={ onEdit } />
			</div>
			<Modal title="医生管理" footer={ null } open={ visible } destroyOnClose={ true } onCancel={ closeModal }>
			
			</Modal>
		</div>
	)
}

export default Doctor;