import { appConfig } from '@app/modules/common/utils/config'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useMemo } from 'react'
import { useSignIn } from 'react-auth-kit'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import calculateTokenLifetime from '../../utils/token-lifetime'
import { parseToken } from '../../utils/token-parser'
import { useProfile } from '../../utils/useProfile'

import { Container } from '@mui/material'

interface FormValues {
  username: string
  firstName: string
  lastName: string
  middleName?: string
  password: string
  passwordConfirmation: string
}

const registerEndpoint = `${appConfig.rest.url}/auth/register`

const RegistrationForm: React.FC = () => {
  const initialValues: FormValues = {
    username: '',
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
    passwordConfirmation: '',
  }

  const { t } = useTranslation()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const user = useProfile()

  const validationSchema: Yup.Schema<FormValues> = useMemo(
    () =>
      Yup.object({
        username: Yup.string().required(`${t('username')} ${t('isRequired')}`),
        firstName: Yup.string().required(`${t('firstName')} ${t('isRequired')}`),
        lastName: Yup.string().required(`${t('lastName')} ${t('isRequired')}`),
        middleName: Yup.string(),
        password: Yup.string()
          .required(`${t('password')} ${t('isRequired')}`)
          .min(6, t('minLength', { what: t('password'), length: 6 })),
        passwordConfirmation: Yup.string()
          .required(`${t('passwordConfirmation')} ${t('isRequired')}`)
          .oneOf([Yup.ref('password')], t('passwordMismatch')),
      }),
    [t]
  )

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (values: FormValues, formikBag: FormikHelpers<FormValues>) => {
    try {
      const response = await axios.post(registerEndpoint, values, {
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

      toast.success(t('thanksForSignUp', { name: tokenInfo.firstName }))
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          formikBag.setErrors({
            username: t('usernameAlreadyTaken'),
          })
          return
        } else {
          const data = error.response?.data.message

          if (typeof data === 'string') {
            toast.error(data)
            return
          }

          if (Array.isArray(data) && data.every((item) => typeof item === 'string')) {
            data.forEach((e: string) => {
              if (!e) {
                return
              }
              const message = `${e[0].toUpperCase()}${e.slice(1)}`
              toast.error(message)
            })
            return
          }
        }
      }

      toast.error(t('registrationFailed'))
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
          {t('register')}
        </Typography>
        <Divider style={{ width: '100%', marginTop: 16 }} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
        >
          {(formik) => (
            <Form style={{ width: '100%', marginTop: 16 }}>
              <Field
                as={TextField}
                fullWidth
                id="firstName"
                name="firstName"
                label={t('firstName')}
                variant="outlined"
                margin="normal"
                autoComplete="given-name"
                helperText={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : ''}
                error={!!formik.errors.firstName && !!formik.touched.firstName}
              />

              <Field
                as={TextField}
                fullWidth
                id="lastName"
                name="lastName"
                label={t('lastName')}
                variant="outlined"
                margin="normal"
                autoComplete="family-name"
                helperText={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : ''}
                error={!!formik.errors.lastName && !!formik.touched.lastName}
              />

              <Field
                as={TextField}
                fullWidth
                id="middleName"
                name="middleName"
                label={t('middleName')}
                variant="outlined"
                margin="normal"
                autoComplete="additional-name"
                helperText={formik.errors.middleName && formik.touched.middleName ? formik.errors.middleName : ''}
                error={!!formik.errors.middleName && !!formik.touched.middleName}
              />

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

              <Field
                as={TextField}
                fullWidth
                id="passwordConfirmation"
                name="passwordConfirmation"
                label={t('passwordConfirmation')}
                type="password"
                variant="outlined"
                margin="normal"
                autoComplete="current-password"
                helperText={
                  formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
                    ? formik.errors.passwordConfirmation
                    : ''
                }
                error={!!formik.errors.passwordConfirmation && !!formik.touched.passwordConfirmation}
              />

              <Button type="submit" fullWidth variant="contained" style={{ marginTop: 16 }}>
                {t('register')}
              </Button>
              <Typography
                variant="body2"
                style={{
                  marginTop: 16,
                }}
              >
                {t('alreadyHaveAccount')}
                <Link
                  to="/login"
                  style={{
                    marginLeft: 3,
                  }}
                >
                  {t('loginHere')}
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}

export default RegistrationForm
