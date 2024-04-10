import { Form, Input, Select, Button } from "antd";

const DepartmentForm = ({ dataSource, onSubmit, onClose }) => {
	const [ form ] = Form.useForm();

	const onFinish = async() => {
		const values = await form.validateFields();
		values.region = values.region.join(",");
		onSubmit(values);
	}

	return (
		<div className="padding-top-base">
			<Form labelCol={{ span: 6 }}
				  wrapperCol={{ span: 18 }}
				  initialValues={ dataSource }
				  form={ form }
			>
				<Form.Item label="所属医院" 
							name="hospital_id"
							rules={[
								{
									required: true,
					            	message: '请选择所属医院'
								}
							]}
				>
					
					<Select>
						{
							RATING_OPTIONS.map(
								(ele, i) => (
									<Option value={ ele } key={ i }>
										{ ele }
									</Option>
								)
							)
						}
					</Select>
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
		</div>
	)
}

export default DepartmentForm;