import React, { useState, useEffect } from 'react';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import ConfirmPopupStyle from '../Styles/Alert.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Biblioteca = () => {

    return (
        <main className={AdminPanelStyle.mainContent}>
            <div className={AdminPanelStyle.panelHeader}>
                <h1>Biblioteca</h1>
                <button className={AdminPanelStyle.addButton}>
                    Agregar trabajo
                </button>
            </div>

            <div className={AdminPanelStyle.adminTableContainer}>
                <table className={AdminPanelStyle.adminTable}>
                    <thead>
                        <tr>
                            <th>Nombre, Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
            </div>

           
        </main>
    );
};

export default Biblioteca