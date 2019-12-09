import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { EndpointsService } from './global.service';

// Menu

export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {
	public items;
	public screenWidth: any
	public collapseSidebar: boolean = false
	public types = []
	MENUITEMS: Menu[] = []

	roleId

	constructor(private global: EndpointsService) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
		// this.setMenu()

	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	setRoleId(roleId) {
		this.roleId = roleId
		this.setMenu()
	}

	setMenu() {
		debugger
		if (this.roleId == 1) {
			debugger
			this.MENUITEMS = [
				{
					title: 'Role', icon: 'user', type: 'sub', active: false, children: [
						{ path: '/superadmin/createrole', title: 'Create Role ', type: 'link' },
						{ path: '/superadmin/viewrole', title: 'Show Role', type: 'link' },

					]
				},
			]
			this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

		} else {
			this.MENUITEMS = [

				// {
				// 	path:'', title: 'Map', icon: 'anchor', type: 'sub', badgeType: 'primary', active: true

				// },

				{
					path: '/tracking', title: 'Tracking', icon: 'map', type: 'link'
				},
				// {
				// 	path: '/clientdetail', title: 'Manage Client', icon: 'users', type: 'link'
				// },
				{
					path: '/attendence', title: 'User Attendence Report', icon: 'file-text', type: 'link'
				},

				{
					path: '/webmail', title: 'Web Mail', icon: 'mail', type: 'link'
				},
				{
					title: 'Task', icon: 'clipboard', type: 'sub', active: false, children: [
						{ path: '/task/assigntask', title: 'Assign-task ', type: 'link' },
						{ path: '/task/showtask', title: 'Show Task', type: 'link' },

					]
				},
				{
					title: 'Client', icon: 'clipboard', type: 'sub', active: false, children: [
						{ path: '/client/addcompany', title: 'Add Client ', type: 'link' },
						{ path: '/client/clientdetail', title: 'Show Client', type: 'link' },

					]
				},
				{
					title: 'Company', icon: 'clipboard', type: 'sub', active: false, children: [
						{ path: '/company/addcompany', title: 'Add Company ', type: 'link' },
						{ path: '/company/showcompany', title: 'Show Company', type: 'link' },

					]
				},


				{
					title: 'Meetings', icon: 'users', type: 'sub', active: false, children: [
						// { path: '/meeting/add-meeting', title: 'Add Meeting', type: 'link' },
						{ path: '/meeting/show-meeting', title: 'Show Meeting', type: 'link' },

					]
				},
				{
					title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
						{ path: '/users/add-user', title: 'Add Users ', type: 'link' },
						{ path: '/users/user-list', title: 'User List', type: 'link' },

					]
				},

				// {
				// 	path: '/documentation', title: 'Documentation', icon: 'file-text', type: 'link'
				// },

			]
			this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
		}

	}





}
