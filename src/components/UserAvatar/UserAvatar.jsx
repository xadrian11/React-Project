import React, { useState } from 'react';
import Modal from '../Modal';
import { updateCurrentUser } from '../../services/users-service';
import styles from './UserAvatar.module.css';
import inputStyle from '../Input/Input.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from '../Form';
import FormControl from '../FormControl';
import Label from '../Label';
import Input from '../Input';
import SubmitButton from '../SubmitButton';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';

function UserAvatar() {
  const FILE_SIZE = 5 * 1000 * 1000;
  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ];

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required('A file is required')
        .test(
          'fileSize',
          'File size cannot exceed 5MB',
          (value) => value && value.size <= FILE_SIZE,
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          (value) => value && SUPPORTED_FORMATS.includes(value.type),
        ),
    }),
    onSubmit: async (values) => {
      await updateCurrentUser({ imgFile: values.file });
      setmodalIsOpen(false);
    },
  });

  const currentUser = useAuth();
  const { userId } = useParams();

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(
    currentUser.avatarURL || '/team-mw-project-2/images/avatar-icon.png',
  );

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.avatar}
        src={avatar}
        alt="avatar"
        data-testid="avatar"
      ></img>
      {currentUser.id === userId ? (
        <button
          className={styles.buttonModal}
          onClick={() => setmodalIsOpen(true)}
          data-testid="editBtn"
        >
          edit
        </button>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        className={styles.modal}
        onClose={() => setmodalIsOpen(false)}
      >
        <Form onSubmit={formik.handleSubmit}>
          <FormControl>
            <Label htmlFor="file" labelContent="Upload image"></Label>
            <Input
              data-testid="inputFile"
              id="file"
              type="file"
              name="file"
              onChange={(e) => {
                const file = e.target.files[0];
                formik.setFieldValue('file', file);
                if (
                  file.size < FILE_SIZE &&
                  SUPPORTED_FORMATS.includes(file.type)
                ) {
                  setAvatar(URL.createObjectURL(file));
                }
              }}
              className={
                formik.touched.file && formik.errors.file
                  ? `${styles.errorBorder}`
                  : `${inputStyle.input}`
              }
            />
            {formik.touched.file && formik.errors.file ? (
              <p className={styles.error}>{formik.errors.file}</p>
            ) : null}
          </FormControl>
          <SubmitButton
            disabled={formik.isSubmitting}
            buttonContent={formik.isSubmitting ? 'Submitting' : 'Submit'}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default UserAvatar;
