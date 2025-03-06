import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Sends a get request with parameters
   * @param url contains url
   * @param [noEncode=false] contains encoding settings
   * Set to true you don't want to use default encodeURI but make sure to encode url params with custom logic(i.e. encodeURIComponent)
   */
  get(url: string, noEncode: boolean = false): Observable<any> {
    url = noEncode ? url : encodeURI(url);
    url = environment.baseUrl + url;

    return this.http.get(url, this.createHttpHeaders());
  }


  /**
   * Sends a post request with payload
   * @param url contains url
   * @param body contains body
   * @param [noEncode=false] contains encoding settings
   * Set to true you don't want to use default encodeURI but make sure to encode url params with custom logic(i.e. encodeURIComponent)
   */
  post(url: string, body: any, noEncode: boolean = false): Observable<any> {
    url = noEncode ? url : encodeURI(url);
    body = { ...body };
    url = environment.baseUrl + url;
    return this.http.post(url, body, this.createHttpHeaders());
  }


  /**
   * Sends a put request with payload
   * @param url contains url
   * @param body contains body
   * @param contentType contains contentType
   * @param embedUrl contains embedUrl
   * @param [noEncode=false] contains encoding settings
   * Set to true you don't want to use default encodeURI but make sure to encode url params with custom logic(i.e. encodeURIComponent)
   */
  edit(
    url: string,
    body?: any,
    contentType: string = 'application/json',
    embedUrl: boolean = true,
    noEncode = false
  ): Observable<any> {
    url = noEncode ? url : encodeURI(url);
    if (body) { body = { ...body }; }
    embedUrl ? (url = environment.baseUrl + url) : (url = url);
    return this.http.put(url, body, this.createHttpHeaders(body, contentType));
  }

  /**
   * Sends a patch request with parameters
   * @param url contains url
   * @param body contains body
   * @param [noEncode=false] contains encoding settings
   * Set to true you don't want to use default encodeURI but make sure to encode url params with custom logic(i.e. encodeURIComponent)
   */
  patch(url: string, body: any, noEncode = false): Observable<any> {
    url = noEncode ? url : encodeURI(url);
    body = { ...body };
    url = environment.baseUrl + url;
    return this.http.patch(url, body, this.createHttpHeaders());
  }


  put(url: string, body: any, noEncode = false): Observable<any> {
    url = noEncode ? url : encodeURI(url);
    body = { ...body };
    url = environment.baseUrl + url;
    return this.http.put(url, body, this.createHttpHeaders());
  }


  /**
   * Sends a delete request with parameters
   * @param url contains url
   * @param body contains body
   * @param [noEncode=false] contains encoding settings
   * Set to true you don't want to use default encodeURI but make sure to encode url params with custom logic(i.e. encodeURIComponent)
   */
  delete(url: string, body?: any, noEncode = false): Observable<any> {
    url = noEncode ? url : encodeURI(url);
    url = environment.baseUrl + url;
    body && Object.keys(body).length ? (body = { ...body }) : (body = {});
    return this.http.delete(url, this.createHttpHeaders(body));
  }


  postFormData(url: string, body: any, noEncode: boolean = false, token = true): Observable<any> {

    let formData = new FormData()
    for (let a in body) {
      formData.set(a, body[a])
    }
    url = noEncode ? url : encodeURI(url);

    url = environment.baseUrl + url;
    if (token) {
      var headers = new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))

      return this.http.post(url, formData, {headers: headers, observe: 'response'})
    }
    else {
      return this.http.post(url, formData, {observe: 'response'})
    }
  }

  postFile(url: string, body: any, noEncode: boolean = false): Observable<any> {
    let formData = new FormData()
    for (let file of body) {
      formData.append("csv_file", file, file.fileName);
    }
    formData.append('type', 'image/png')
    url = noEncode ? url : encodeURI(url);
    url = environment.baseUrl + url;
    var headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    return this.http.post(url, formData, {headers: headers, observe: 'response' })


  }


  /**
   * Creates http headers to send with every request
   * @param body contains body
   * @param contentType contains contentType
   */
  private createHttpHeaders(body?: any, contentType: string = 'application/json'): object {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': contentType,
      authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : 'asdasdasdasd'
    });
    if (!body) {
      return { headers: httpHeaders, observe: 'response' };
    } else {
      return {
        headers: httpHeaders,
        observe: 'response',
        body,
      };
    }
  }



  getEnvironment(): any {
    return environment;
  }
}
