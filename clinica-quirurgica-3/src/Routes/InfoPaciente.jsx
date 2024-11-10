import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoPacienteStyle from '../Styles/InfoPaciente.module.css';

const InfoPacientes = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: '¿Cómo puedo programar una cita?',
      answer: 'Puede programar una cita llamando a nuestra recepción o a través de nuestro portal en línea.'
    },
    {
      question: '¿Qué debo traer a mi primera consulta?',
      answer: 'Traiga todos sus informes médicos previos y su identificación personal.'
    },
    {
      question: '¿Cuáles son sus políticas de pago?',
      answer: 'Aceptamos diferentes métodos de pago, incluyendo seguros médicos. Por favor, consulte nuestra política detallada en la página de pagos.'
    },
    {
      question: '¿Cómo puedo obtener mis resultados de exámenes?',
      answer: 'Los resultados estarán disponibles en nuestro portal de pacientes o se le enviarán por correo electrónico.'
    },
  ];

  const cards = [
    {
      title: 'Preparación para la Cirugía',
      description: 'Información importante sobre cómo prepararse para su procedimiento quirúrgico.',
      buttonText: 'Leer más'
    },
    {
      title: 'Cuidados Postoperatorios',
      description: 'Guía detallada sobre los cuidados necesarios después de su cirugía.',
      buttonText: 'Leer más'
    },
    {
      title: 'Derechos del Paciente',
      description: 'Conozca sus derechos como paciente en nuestra clínica.',
      buttonText: 'Leer más'
    },
  ];

  return (
    <div className={InfoPacienteStyle.infoPacientes}>
      {/* Sección de Información para Pacientes */}
      <section className={InfoPacienteStyle.cardsSection}>
        <h1 className={InfoPacienteStyle.title}>Información para Pacientes</h1>
        <p className={InfoPacienteStyle.description}>
          En Clínica Quirúrgica 3, nos comprometemos a proporcionar la mejor atención e información a nuestros pacientes. Aquí encontrará recursos útiles para su visita y tratamiento.
        </p>

        {/* Sección de Tarjetas */}
        <div className={InfoPacienteStyle.cardsContainer}>
          {cards.map((card, index) => (
            <div key={index} className={InfoPacienteStyle.card}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <button>{card.buttonText}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className={InfoPacienteStyle.faqSection}>
  <div className={InfoPacienteStyle.faqContainer}>
    <div className={InfoPacienteStyle.faqContent}>
      <h2 className={InfoPacienteStyle.faqTitle}>Preguntas Frecuentes</h2>

      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default InfoPacientes;
