
package org.mes.jax.test.config;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.Action;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebService(name = "ScadaTdowntimeService", targetNamespace = "http://impl.service.jax.mes.org/")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface ScadaTdowntimeService {


    /**
     * 
     * @param arg0
     * @return
     *     returns java.lang.String
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "addScadaTdowntime", targetNamespace = "http://impl.service.jax.mes.org/", className = "org.mes.jax.test.config.AddScadaTdowntime")
    @ResponseWrapper(localName = "addScadaTdowntimeResponse", targetNamespace = "http://impl.service.jax.mes.org/", className = "org.mes.jax.test.config.AddScadaTdowntimeResponse")
    @Action(input = "http://impl.service.jax.mes.org/ScadaTdowntimeService/addScadaTdowntimeRequest", output = "http://impl.service.jax.mes.org/ScadaTdowntimeService/addScadaTdowntimeResponse")
    public String addScadaTdowntime(
        @WebParam(name = "arg0", targetNamespace = "")
        Object arg0);

}
