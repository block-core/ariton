"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[76],{39434:(p,u,e)=>{e.d(u,{p:()=>l});var i=e(10467),a=e(93953),r=e(67402),f=e(22312);let l=(()=>{class c{constructor(){this.identity=(0,a.WQX)(r.K),this.current=(0,a.vPA)({did:"",name:"",title:"",bio:"",profileImage:"",profileBanner:"",status:"",location:"",links:[],birthDate:""})}loadProfile(d){var t=this;return(0,i.A)(function*(){const n=yield t.identity.web5.dwn.records.query({message:{filter:{protocol:f.ME.uri,protocolPath:"profile",dataFormat:"application/json"}}});console.log("Records in load profile:",n.records);let _={},s=null;if(n.records)for(const o of n.records)s=o,_={...yield o.data.json(),id:o.dataCid,did:o.author,created:o.dateCreated};return{record:s,profile:_}})()}openProfile(d){var t=this;return(0,i.A)(function*(){if(d==t.identity.did){const n=yield t.identity.web5.dwn.records.query({message:{filter:{protocol:f.ME.uri,protocolPath:"profile",dataFormat:"application/json"}}});n.records&&n.records.forEach(function(){var _=(0,i.A)(function*(s){let o=yield s.data.json();console.log(o),o={...o,id:s.dataCid,did:s.author,created:s.dateCreated},t.current.set(o),console.log(o)});return function(s){return _.apply(this,arguments)}}())}else{console.log("QUERY FOR USER PROFILE!!");const n=yield t.identity.web5.dwn.records.query({from:d,message:{filter:{protocol:f.ME.uri,protocolPath:"profile",dataFormat:"application/json"}}});console.log("Records in open profile:",n.records),n.records&&n.records.length>0?n.records.forEach(function(){var _=(0,i.A)(function*(s){let o=yield s.data.json();console.log(o),o={...o,id:s.dataCid,did:s.author,created:s.dateCreated},t.current.set(o),console.log(o)});return function(s){return _.apply(this,arguments)}}()):(console.log("NOTHING FOUND!!"),t.current.set({did:d,bio:"",profileImage:"",profileBanner:"",links:[],title:"",name:"No profile found"}))}})()}static#o=this.\u0275fac=function(t){return new(t||c)};static#t=this.\u0275prov=a.jDH({token:c,factory:c.\u0275fac,providedIn:"root"})}return c})()},69226:(p,u,e)=>{e.d(u,{x:()=>a});var i=e(93953);let a=(()=>{class r{constructor(){this.bsn={tokens:[],sources:[],accounts:[]}}static#o=this.\u0275fac=function(c){return new(c||r)};static#t=this.\u0275prov=i.jDH({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})()},98703:(p,u,e)=>{e.d(u,{g:()=>a});var i=e(93953);let a=(()=>{class r{transform(l,c){if(l){const E=Math.floor((+new Date-+new Date(l))/1e3);if(E<29)return"Just now";const d={year:31536e3,month:2592e3,week:604800,day:86400,hour:3600,minute:60,second:1};let t;for(const n in d)if(t=Math.floor(E/d[n]),t>0)return 1===t?t+" "+n+" ago":t+" "+n+"s ago"}return l}static#o=this.\u0275fac=function(c){return new(c||r)};static#t=this.\u0275pipe=i.EJ8({name:"ago",type:r,pure:!0,standalone:!0})}return r})()},22312:(p,u,e)=>{e.d(u,{ME:()=>r});var i=e(4053);e(45189);const r={uri:i.Q.protocol,definition:i.Q}}}]);