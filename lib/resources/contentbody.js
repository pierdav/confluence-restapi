/**!
 * ConfluenceAPI - lib/resources/content.js
 *
 * Copyright(c) Sam Li and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Sam Li <sam.li@zoom.us> (http://github.com/lisanlai)
 */

 'use strict';

 /**
  * Module dependencies.
  */
 var util = require('util');
 var fs = require('fs');
 var request = require("request");
 var HttpMethod = require('../Httpmethod');
 var RESTFulResource = require("../RESTFulResource");
 
 /**
  * Content module.
  * @param {Object} client 
  */
 function Contentbody(client){
     this.constructor.super_.call(this, client);
 }
 
 util.inherits(Contentbody, RESTFulResource);
 
 /**
  * Get content, returns all content in a Confluence instance.
  * @param {object} params Query parameters
  *  - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-get
  *  - {integer} limit, The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
  *  - {string} orderby, Orders the content by a particular field. Specify the field and sort direction for this parameter, as follows: ‘fieldpath asc/desc’. For example, ‘history.createdDate desc’.
  *  - {string} postingDay, The posting date of the blog post to be returned. Required for blogpost type. Format: yyyy-mm-dd.
  *  - {string} spaceKey, The key of the space to be queried for its content.
  *  - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
  *  - {string} status, Default: current. Valid values: current trashed draft any
  *  - {string} title, The title of the page to be returned. Required for page type.
  *  - {string} trigger, If set to viewed, the request will trigger a ‘viewed’ event for the content. When this event is triggered, the page/blogpost will appear on the ‘Recently visited’ tab of the user’s Confluence dashboard. Valid values: viewed
  *  - {string} type, The type of content to return. Default: page. Valid values: page blogpost
  * @param {function} cb Callback function 
  */
  Contentbody.prototype.convertTo = function(to, body, cb){
 
    var args = {
        path: {
            to: to
        },
        data: body || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
 
     var client = this.client;
     // registering remote methods 
     client.registerMethod("convertTo", this.path("/contentbody/convert/${to}"), HttpMethod.POST);
     
     /**
      * this would construct the following URL before invocation
      */
     client.methods.convertTo(args, function (data, response) {
         client.processCallback(cb, null, data, response);
     }).on('error', function (err) {
         client.processCallback(cb, err);
     });

 };
 

 
 module.exports = Contentbody;