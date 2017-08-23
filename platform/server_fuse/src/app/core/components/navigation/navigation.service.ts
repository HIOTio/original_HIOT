import { EventEmitter, Injectable} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthenticationService } from '../../../core/auth/auth.service';
@Injectable()
export class FuseNavigationService
{
    onNavCollapseToggled = new EventEmitter<any>();
    navigation: any[];
    flatNavigation: any[] = [];

    constructor(private http: Http,private auth: AuthenticationService)
    {
     	this.navigation=[];
				     
		
    }

    /**
     * Get navigation array
     * @returns {any[]}
     */

    getNavigation() :Observable<any[]>
    {
        return this.http.get('http://localhost:3000/api/navigation/'+ JSON.parse(localStorage.getItem('currentUser')).id,this.auth.getAuthHeaders())
		.map(function (res){
			(res:Response)=>res.json(); 
			var my_menu = res.json();
			return my_menu;
		});
    }

    /**
     * Get flattened navigation array
     * @param navigationItems
     * @returns {any[]}
     */
    getFlatNavigation(navigationItems?)
    {
        if ( !navigationItems )
        {
            navigationItems = this.getNavigation();
        }

        for ( const navItem of navigationItems )
        {
            if ( navItem.type === 'subheader' )
            {
                continue;
            }

            if ( navItem.type === 'nav-item' )
            {
                this.flatNavigation.push({
                    title: navItem.title,
                    type : navItem.type,
                    icon : navItem.icon || false,
                    url  : navItem.url
                });

                continue;
            }

            if ( navItem.type === 'nav-collapse' )
            {
                this.getFlatNavigation(navItem.children);
            }
        }

        return this.flatNavigation;
    }
}
