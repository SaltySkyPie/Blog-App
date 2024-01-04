import { appConfig } from '@app/modules/common/utils/config'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useSignIn } from 'react-auth-kit'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import calculateTokenLifetime from '../../utils/token-lifetime'
import { parseToken } from '../../utils/token-parser'
import { useProfile } from '../../utils/useProfile'

interface FormValues {
  username: string
  password: string
}

const loginEndpoint = `${appConfig.rest.url}/auth/login`

const validationSchema: Yup.Schema<FormValues> = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

const LoginForm: React.FC = () => {
  const initialValues: FormValues = {
    username: '',
    password: '',
  }

  const { t } = useTranslation()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const user = useProfile()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post(loginEndpoint, values, {
        validateStatus: (status) => status >= 200 && status < 300,
      })

      const { accessToken, refreshToken } = response.data

      if (!accessToken || !refreshToken || typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
        throw new Error(t('invalidCredentials'))
      }

      const tokenInfo = parseToken(accessToken)
      const refreshTokenInfo = parseToken(refreshToken)

      signIn({
        token: accessToken,
        tokenType: 'Bearer',
        // token expiresIn - convert to minutes as react-auth-kit expects minutes
        expiresIn: calculateTokenLifetime(tokenInfo),
        refreshToken,
        refreshTokenExpireIn: calculateTokenLifetime(refreshTokenInfo),
        authState: tokenInfo,
      })

      toast.success(t('welcomeBack', { name: tokenInfo.firstName }))
      navigate('/')
    } catch (error) {
      toast.error(t('invalidCredentials'))
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('login')}
        </Typography>
        <Divider style={{ width: '100%', marginTop: 16 }} />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form style={{ width: '100%', marginTop: 16 }}>
              <Field
                as={TextField}
                fullWidth
                id="username"
                name="username"
                label={t('username')}
                variant="outlined"
                margin="normal"
                autoComplete="username"
                helperText={formik.errors.username && formik.touched.username ? formik.errors.username : ''}
                error={!!formik.errors.username && !!formik.touched.username}
              />

              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                label={t('password')}
                type="password"
                variant="outlined"
                margin="normal"
                autoComplete="current-password"
                helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                error={!!formik.errors.password && !!formik.touched.password}
              />

              <Button type="submit" fullWidth variant="contained" color="secondary" style={{ marginTop: 16 }}>
                {t('login')}
              </Button>
              <Typography
                variant="body2"
                style={{
                  marginTop: 16,
                }}
              >
                {t('dontHaveAccount')}
                <Link
                  to="/register"
                  style={{
                    marginLeft: 3,
                  }}
                >
                  {t('createOne')}
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}

export default LoginForm
