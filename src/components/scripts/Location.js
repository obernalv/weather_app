import { useState } from "react";

function getLocation(success, getAcceso) {

    
    const msj = {
        permision_denied:       "Permiso denegado para acceder a la ubicación.",
        position_unavailable:   "La información de la ubicación no está disponible.",
        time_out:               "Tiempo de espera excedido para obtener la ubicación.",
        unknown_error:          "Error desconocido al intentar obtener la ubicación.",
        default:                "La geolocalización no es compatible con este navegador"
    }

    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(

            success,

            function(error) {
                // Manejo de errores
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        console.error(msj.permision_denied)
                        getAcceso(true); 
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error(msj.position_unavailable)
                        break;
                    case error.TIMEOUT:
                        console.error(msj.time_out)
                        break;
                    case error.UNKNOWN_ERROR:
                        console.error(msj.unknown_error)
                        break;
                }
            }
        );
        
    } else {
        console.error(msj.default);
    }
    
}

export default getLocation