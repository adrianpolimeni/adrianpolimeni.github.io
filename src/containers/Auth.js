import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithPopup,
  signOut,
  browserSessionPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Checkbox, Divider, Flex, Alert, Col, Row, Segmented, Carousel} from "antd";
import { Navigate, useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [user, setUser] = useState(auth.currentUser);
  const [signInError, setSignInError] = useState(""); 
  const [signUpError, setSignUpError] = useState(""); 

  useEffect(() => {
    console.log(user);
    if(user != null){
        navigate("/");
    }
  }, [user]);

  const signIn = async (values) => {

      await setPersistence(auth, values.rememberSignIn ? browserLocalPersistence : browserSessionPersistence);
      console.log(values);
      signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => 
      {
        const user = userCredential.user;
        setUser(user);
        console.log(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 400)
            setSignInError(errorMessage);
        console.error(errorMessage);
      });
    
  };

  const signUp = async (values) => {

      await setPersistence(auth, values.rememberSignUp ? browserLocalPersistence : browserSessionPersistence);

      createUserWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const signInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence);
    signInWithPopup(auth,googleProvider).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const onFormSwitch = (value) =>
  {
    ref.current.goTo(value,false);
  }

  const SignInForm = () =>
  {
    return (
      <Form
        name="signIn"
        initialValues={{
          rememberSignIn: true,
        }}
        layout="vertical"
        onFinish={(e) => signIn(e)}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        style={{paddingLeft:10, paddingRight:10, paddingTop:10}}
      >
        <Form.Item label="Email" name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item label="Password" name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>

        <Form.Item name="rememberSignIn" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:"100%"}}>Sign In</Button>
        </Form.Item>
        {signInError != "" ?  <Alert message={signInError} type="error" /> : <></>}
      </Form>
    );
  }

  const SignUpForm = () =>
  {
    return (
      <Form
        name="signUp"
        initialValues={{
          rememberSignUp: true,
        }}
        layout="vertical"
        onFinish={(e) => signUp(e)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{paddingLeft:10, paddingRight:10, paddingTop:10}}
      >
        <Form.Item label="Name" name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item label="Password" name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>

        <Form.Item name="rememberSignUp" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item validateFirst >
          <Button type="primary" htmlType="submit" style={{width:"100%"}}>Sign Up</Button>
        </Form.Item>
        {signUpError != "" ?  <Alert message={signUpError} type="error" /> : <></>}

      </Form>
    );
  }

  console.log("Render");

  return (
    <div
    style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
    >
      <Card title="Welcome to Itin" bordered={true} style={{ width: 300, maxWidth: 600 }}>
        <Segmented
          block={true}
          options={[
            { label: 'Sign In', value: 0  },
            { label: 'Sign Up', value: 1 },
          ]}
          onChange={onFormSwitch}
        />
        <Carousel ref={ref} slide={true} dots={false} draggable={false}>
          <div>
            <SignInForm/>
            <Divider/>
            <Button onClick={signInWithGoogle} style={{width:"100%", height:40}}>
              <Row align="middle" justify="space-between" style={{width:"100%"}}>
              <Col>Sign In with Google </Col>
              <Col><GoogleOutlined style={{fontSize:24, paddingTop:2}}/></Col>
              </Row>
            </Button>
          </div>
          <SignUpForm/>
        </Carousel>
        </Card>
    </div>
  );
};

export default Auth;