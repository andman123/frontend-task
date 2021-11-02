import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

interface ContactFormValues {
	firstName: string;
	lastName: string;
	email: string;
	messageCategory: string;
	message: string;
	image: string;
}

const ContactForm: FC<{}> = () => {
	const initialValues: ContactFormValues = {
		firstName: "",
		lastName: "",
		email: "",
		messageCategory: "",
		message: "",
		image: "",
	};
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			//formik.resetForm();
		},
		validationSchema: Yup.object().shape(
			{
				firstName: Yup.string().when("lastName", {
					is: (val: any) => {
						return !val;
					}, // alternatively: (val) => val == true
					then: Yup.string().required(),
					otherwise: Yup.string(),
				}),
				lastName: Yup.string().when("firstName", {
					is: (val: any) => {
						return !val;
					}, // alternatively: (val) => val == true
					then: Yup.string().required(),
					otherwise: Yup.string(),
				}),
				email: Yup.string()
					.email("Invalid email address")
					.required("Required"),
				messageCategory: Yup.string().required(),
				message: Yup.string().min(10, "минимум 10 символов").required(),
			},
			[["firstName", "lastName"]]
		),
	});

	return (
		<div className="container mt-5">
			<h1 className="text-center">Форма обратной связи</h1>

			<form className="row g-3" onSubmit={formik.handleSubmit}>
				<div className="col-md-6">
					<label htmlFor="firstName" className="form-label">
						имя
					</label>
					<input
						id="firstName"
						name="firstName"
						placeholder="имя"
						className={classNames("form-control", {
							"is-invalid":
								formik.touched.firstName &&
								formik.errors.firstName,
						})}
						type="text"
						onChange={formik.handleChange}
						value={formik.values.firstName}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="lastName" className="form-label">
						фамилия
					</label>
					<input
						id="lastName"
						name="lastName"
						placeholder="фамилия"
						className={classNames("form-control", {
							"is-invalid":
								formik.touched.lastName &&
								formik.errors.lastName,
						})}
						type="text"
						onChange={formik.handleChange}
						value={formik.values.lastName}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="email" className="form-label">
						email
					</label>
					<input
						id="email"
						name="email"
						placeholder="email"
						className={classNames("form-control", {
							"is-invalid": formik.errors.email,
						})}
						type="email"
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="messageCategory" className="form-label">
						категория сообщения
					</label>
					<select
						id="messageCategory"
						name="messageCategory"
						placeholder="фамилия"
						className={classNames("form-control", {
							"is-invalid":
								formik.touched.messageCategory &&
								formik.errors.messageCategory,
						})}
						onChange={formik.handleChange}
						value={formik.values.messageCategory}
					>
						<option value=""></option>
						<option value="Digital-разработка">
							Digital-разработка
						</option>
						<option value="Усиление команды">
							Усиление команды
						</option>
					</select>
				</div>
				<div className="col-12">
					<label htmlFor="message" className="form-label">
						сообщение
					</label>
					<textarea
						id="message"
						name="message"
						placeholder="сообщение"
						className={classNames("form-control", {
							"is-invalid":
								formik.touched.message && formik.errors.message,
						})}
						rows={4}
						onChange={formik.handleChange}
						value={formik.values.message}
					/>
					{formik.touched.message && formik.errors.message && (
						<div className="invalid-feedback">
							{formik.errors.message}
						</div>
					)}
				</div>

				<div className="col-12">
					<label htmlFor="formFile" className="form-label">
						картинка
					</label>
					<input
						className="form-control"
						name="image"
						type="file"
						id="formFile"
						onChange={(event) => {
							formik.setFieldValue(
								"image",
								event.target.files![0]
							);
						}}
					/>
				</div>

				<div className="col-12">
					<button type="submit" className="btn btn-primary">
						Отправить
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
