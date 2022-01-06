import {AjaxClient2 as AjaxClient} from 'ajax-client';

export default class HttperClient {
    constructor() {
        this.url = "Handbook.json";
        this.client = new AjaxClient();
        this.lastData = null;
        this.DefaultSuccess = async (x) => {return x;}
    }

    Get = async (params = null, aCallback = async (e)=> {}) => {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = async () => { 
            if(anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
                aCallback(anHttpRequest.responseText); 
                this.lastData = anHttpRequest.responseText;
            }
            else console.error("HTTP REQUEST: ERROR");
        }
        
        var parameters = "";
        if(params != null) for (var [key, value] of Object.entries(params)) parameters += key + "=" + value;
    
        anHttpRequest.open( "GET" , this.url + parameters, false );            
        anHttpRequest.send( null );
    }

    Post = async (params, aCallback) => {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = () => { 
            if(anHttpRequest.readyState == 4 && anHttpRequest.status == 200)  {
                aCallback(anHttpRequest.responseText); 
                this.lastData = anHttpRequest.responseText;
            }
            else console.error("HTTP REQUEST: ERROR");
        }
        
        var parameters = "";
        var i = 0;

        for (var [key, value] of Object.entries(params)) {
           if(i != 0) parameters += "&";
           parameters += key + "=" + value;
           i++;
        }
    
        anHttpRequest.open( "POST" , this.url , params.async );            
        anHttpRequest.send( parameters );
    }

    BuildRequest = async (x = {}) => {
        this.client.ajax({
            data: (x.hasOwnProperty("data")) ? JSON.stringify(x.data) : null,
            type: (x.hasOwnProperty("method")) ? x.method : 'GET',
            url: (x.hasOwnProperty("url")) ? x.url : this.url,
            contentType:  (x.hasOwnProperty("contentType")) ? x.contentType : 'application/json',
            dataType: (x.hasOwnProperty("dataType")) ? x.dataType : 'json',
            timeoutMillis: 5000,
            headers: {
              'X-Original-Header1': 'header-value-1',
              'X-Original-Header2': 'header-value-2',
            },
            success: (x.hasOwnProperty("success")) ? x.success : this.DefaultSuccess,
            error: (x.hasOwnProperty("error")) ? x.error : (e, xhr) => {
                console.error(" HTTP REQUEST FAILED : ");
                console.error(e);
                console.error(xhr);
            },
            timeout: (e, xhr) => {}
          });
    }

}