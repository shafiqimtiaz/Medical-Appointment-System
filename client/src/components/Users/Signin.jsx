import React, { useState } from "react";
import { Button, Form, Input, Typography, notification } from "antd";
import { CloseCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const { mTap } = Typography;

const linkStyle = {
    color: "black",
    display: "flex",
    alignItems: "center",
    marginLeft: "-30px",
};

export default function Signin() {
    const awaitNotification = () => {
        notification.open({
            message: "Registration is not yet approved",
            icon: <MinusCircleTwoTone twoToneColor="#FDBA1A" />,
        });
    };

    const invalidNotification = () => {
        notification.open({
            message: "Invalid Email or Password",
            icon: <CloseCircleTwoTone twoToneColor="#E32828" />,
        });
    };

    const showDevInfo = () => {
        const swal = withReactContent(Swal);
        swal.fire({
            title: "Developers &#128187;",
            html:
                "<table style='margin: 0 auto; text-align: center; border: 1px solid black; padding: 5px;'>" +
                "<tr>" +
                "<th>Name</th>" +
                "<th>Email</th>" +
                "</tr>" +
                "<tr>" +
                "<td>Shafiq Imtiaz</td>" +
                "<td><a href='mailto:shafiqimtiaz@gmail.com'>shafiqimtiaz@gmail.com</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td>Abderraouf Drine</td>" +
                "<td><a href='mailto:abderraoufdrine@gmail.com'>abderraoufdrine@gmail.com</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td>Hadi Ahmad</td>" +
                "<td><a href='mailto:hadiahmad4104@gmail.com'>hadiahmad4104@gmail.com</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td>Vithu Maheswaran</td>" +
                "<td><a href='mailto:vithu.maheswaran@gmail.com'>vithu.maheswaran@gmail.com</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td>Kazi Asif Tanim</td>" +
                "<td><a href='mailto:tanimasif23@gmail.com'>tanimasif23@gmail.com</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td>Dikshant Yadav</td>" +
                "<td><a href='mailto:005dikshant@gmail.com'>005dikshant@gmail.com</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td>Peter Sakr</td>" +
                "<td><a href='mailto:peter.l.sakr@gmail.com'>peter.l.sakr@gmail.com</a></td>" +
                "</tr>" +
                "</table>",
            footer: '<a href="https://github.com/shafiqimtiaz/SPM_6841_Project">Github Repo</a>',
        });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        let user = null;
        try {
            user = {
                email: email,
                password: password,
            };
            const res = await axios.post("/auth/login", user);

            if (res.data.message === "Staff not approved!") awaitNotification();
            else if (res.data.message === "User not found!")
                invalidNotification();
            else if (res.data.role === "manager") {
                navigate("/Manager", { state: { val: res.data.access_token } });
            } else {
                navigate("/dashboard");
            }
            dispatch(loginSuccess(res.data));
        } catch (error) {
            invalidNotification();
            dispatch(loginFailure);
        }
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Form.Item style={{ display: "flex", alignItems: "center" }}>
                    <Button type="primary" onClick={handleLogIn}>
                        Login
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Link to="/register">
                        <mTap style={linkStyle}>
                            New User?&nbsp;<b>Register</b>
                        </mTap>
                    </Link>
                </Form.Item>

                <Form.Item style={{ display: "flex", alignItems: "center" }}>
                    <Button type="default" onClick={showDevInfo}>
                        About
                    </Button>
                </Form.Item>
            </Form.Item>
        </Form>
    );
}
