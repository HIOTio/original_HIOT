import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {AuthenticationService } from "./core/auth/auth.service";
export class FuseNavigation
{
    public items: any[];

    constructor(private http: Http, private auth: AuthenticationService)
    {
        this.items = [
			            {
                title: "Dashboard",
                type : "nav-item",
                icon : "dashboard",
                url  : "/dashboard",
                badge: {
                    title: 25,
                    bg   : "#F44336",
                    fg   : "#FFFFFF",
                },
            },
            {
                title: "Deployments",
                type : "subheader",
            },
			            {
                title: "-- ALL --",
                type : "nav-item",
                icon : "building",
                url  : "/deployment",
                badge: {
                    title: 25,
                    bg   : "#F44336",
                    fg   : "#FFFFFF",
                },
            },
            {
                title: "Global Headquarters",
                type : "nav-item",
                icon : "building",
                url  : "/deployment/dep1",
                badge: {
                    title: 25,
                    bg   : "#F44336",
                    fg   : "#FFFFFF",
                },
            },
			{
                title: "EMEA Dublin",
                type : "nav-item",
                icon : "building",
                url  : "/deployment/dep2",
                badge: {
                    title: 25,
                    bg   : "#F44336",
                    fg   : "#FFFFFF",
                },
            },
			{
                title: "Reports",
                type : "subheader",
            },
        ];
    }
	public ngInit(){

	}
}
