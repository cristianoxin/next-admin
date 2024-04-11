import { useCallback } from "react";

import { Form, Input, Cascader, Select, Button } from "antd";

import { REGION_OPTIONS, RATING_OPTIONS } from "@/common/constant";

const { Option } = Select;

const HospitalForm = ({ dataSource, onSubmit, onClose }) => {
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
				  initialValues={ dataSource ? { ...dataSource, region: dataSource.region.split(",") } : null }
				  form={ form }
			>
				<Form.Item label="医院全称" 
							name="name"
							rules={[
								{
									required: true,
									message: "请输入医院全称"
								}
							]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="医院等级"
							name="rating"
							rules={[
					          	{
					            	required: true,
					            	message: '请选择医院等级'
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
				<Form.Item label="省，市，区"
							name="region"
							rules={[
					          	{
					            	type: 'array',
					            	required: true,
					            	message: '请选择省市区'
					          	}
					        ]}
				>
					<Cascader
					    options={ REGION_OPTIONS }
					/>
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

export default HospitalForm;