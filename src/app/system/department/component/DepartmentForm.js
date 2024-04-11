import { useState } from "react";
import { Form, Input, Select, Button, Row, Col, Modal } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import HospitalForm from "@/app/system/hospital/component/HospitalForm";

const { Option } = Select;

const DepartmentForm = ({ dataSource, hospitalList, onHospitalSubmit, hospitalLoading, onSubmit, onClose }) => {
	const [ form ] = Form.useForm();

	const [ visible, setVisible ] = useState(false);

	const onFinish = async() => {
		const values = await form.validateFields();
		onSubmit(values);
	}

	const openModal = () => {
		setVisible(true);
	}

	const closeModal = () => {
		setVisible(false);
	}

	return (
		<div className="padding-top-base">
			<Form labelCol={{ span: 6 }}
				  wrapperCol={{ span: 18 }}
				  initialValues={ dataSource }
				  form={ form }
			>
				<Form.Item label="所属医院">
					<Row gutter={ 10 }>
				        <Col span={ 18 }>
				            <Form.Item
				              	name="hospital_id"
				              	noStyle
				              	rules={[
									{
										required: true,
						            	message: '请选择所属医院'
									}
								]}
				            >
				              	<Select loading={ hospitalLoading }>
									{
										hospitalList.map(
											(ele, i) => (
												<Option value={ ele.id } key={ i }>
													{ ele.name }
												</Option>
											)
										)
									}
								</Select>
				            </Form.Item>
				        </Col>
				        <Col span={ 6 } className="justify-end align-center">
				            <Button type="primary" icon={ <PlusOutlined /> } onClick={ openModal }> 
				            	新增
				            </Button>
				        </Col>
			        </Row>
				</Form.Item>
				<Form.Item label="科室全称"
							name="name"
							rules={[
					          	{
					            	required: true,
					            	message: '请输入科室全称'
					          	}
					        ]}
				>
					<Input />
				</Form.Item>
			</Form>
			<div className="margin-top-base text-center">
				<Button type="primary" onClick={ onFinish }>
					提交
				</Button>
				<Button className="margin-left-small" onClick={ onClose }>
					取消
				</Button>
			</div>
			<Modal title="医院管理" footer={ null } open={ visible } destroyOnClose={ true } onCancel={ closeModal }>
				<HospitalForm dataSource={ null } onSubmit={ onHospitalSubmit } onClose={ closeModal } />
			</Modal>
		</div>
	)
}

export default DepartmentForm;