import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api";
import ModalContext from "../../context/ModalContext";
import PropTypes from "prop-types";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

import "./AppointmentForm.css";

const AppointmentForm = ({ refreshAppointments }) => {
  const { openModal } = useContext(ModalContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      birthDate: "",
      appointmentDate: new Date(),
      appointmentTime: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é necessário para agendamento"),
      birthDate: Yup.string().required(
        "Data de nascimento é necessária para agendamento"
      ),
      appointmentDate: Yup.date().required("Informe a data para agendamento"),
      appointmentTime: Yup.string().required("Informe a hora para agendamento"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.post("/appointments", values);
        openModal("Vacina agendada com sucesso!");
        resetForm();
        refreshAppointments();
      } catch (error) {
        if (error.response && error.response.data) {
          openModal(error.response.data.message);
        } else {
          openModal("Falha ao criar agendamento.");
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="appointment-form">
      <div className="form-group">
        <div className="form-title">Dados pessoais</div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="form-control"
        />
        {formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </div>

      <div className="form-group">
        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="birthDate"
          onChange={formik.handleChange}
          value={formik.values.birthDate}
          className="form-control"
        />
        {formik.errors.birthDate && (
          <div className="error-message">{formik.errors.birthDate}</div>
        )}
      </div>

      <div className="form-group">
        <div className="form-title">Dados do agendamento</div>
        <label>Data do Agendamento:</label>
        <DatePicker
          selected={formik.values.appointmentDate}
          onChange={(date) => formik.setFieldValue("appointmentDate", date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          className="form-control"
        />
        {formik.errors.appointmentDate && (
          <div className="error-message">{formik.errors.appointmentDate}</div>
        )}
      </div>

      <div className="form-group">
        <label>Hora do Agendamento:</label>
        <input
          type="time"
          name="appointmentTime"
          onChange={formik.handleChange}
          value={formik.values.appointmentTime}
          className="form-control"
        />
        {formik.errors.appointmentTime && (
          <div className="error-message">{formik.errors.appointmentTime}</div>
        )}
      </div>

      <button type="submit">Agendar</button>
    </form>
  );
};

AppointmentForm.propTypes = {
  refreshAppointments: PropTypes.func.isRequired,
};

AppointmentForm.displayName = "AppointmentForm";

export default AppointmentForm;
