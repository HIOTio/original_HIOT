import { EventEmitter, Injectable} from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {AuthenticationService } from "../../../core/auth/auth.service";
import {ConfigService } from "../../services/config.service";
@Injectable()
export class NavigationService
{
    public onNavCollapseToggled = new EventEmitter<any>();
    public navigation: any[];
    public flatNavigation: any[] = [];
public display: boolean;
    constructor(private http: Http, private auth: AuthenticationService, private configService: ConfigService)
    {
     	this.navigation = [];
      this.display=false;
      auth.userProfile.subscribe(
          (profile)=>{
              console.log(profile);
            return this.http.get(this.configService.server + "/api/navigation/" + profile.profile._id, this.auth.getAuthHeaders())
            .map(function(res){
                this.display=true;
                (res: Response) => res.json();
                const my_menu = res.json();
                
            });


          }
       
      )
    }

    /**
     * Get navigation array
     * @returns {any[]}
     */
  
    public getNavigation(): any[]
    {
        return this.navigation;
        
    }

    /**
     * Get flattened navigation array
     * @param navigationItems
     * @returns {any[]}
     */
    public getFlatNavigation(navigationItems?)
    {
        if ( !navigationItems )
        {
            navigationItems = this.getNavigation();
        }

        for ( const navItem of navigationItems )
        {
            if ( navItem.type === "subheader" )
            {
                continue;
            }

            if ( navItem.type === "nav-item" )
            {
                this.flatNavigation.push({
                    title: navItem.title,
                    type : navItem.type,
                    icon : navItem.icon || false,
                    url  : navItem.url,
                });

                continue;
            }

            if ( navItem.type === "nav-collapse" )
            {
                this.getFlatNavigation(navItem.children);
            }
        }

        return this.flatNavigation;
    }
}
