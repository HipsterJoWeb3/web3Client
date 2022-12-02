import AdminPosts from "../components/adminPage/chapters/AdminPosts";
import AdminWebsite from "../components/adminPage/chapters/AdminWebsite";
import AdminModerators from "../components/adminPage/chapters/AdminModerators";
import CreatePost from "../components/adminPage/chapters/CreatePost";
import AddModerator from "../components/adminPage/chapters/AddModerator";
import React from "react";

import AdminPostChapter from "../components/adminPage/chapters/AdminPostChapter";
import AdminPages from "../components/adminPage/chapters/AdminPages";
import AdminPagesAdd from "../components/adminPage/chapters/AdminPagesAdd";



export interface Links {
    name: string;
    link?: string;
    actionCallback?: string;
    Component?: React.FC
    showRouteDependRole?: string[];
}

export const logoutLinks: Links[] = [
    {link: '/login', name: 'Login'},
]


export const links: Links[] = [
    {name: 'Logout', actionCallback: 'logout'},
    {link: '/admin?chapter=general', name: 'Admin'},
]

export const tabLinksAdmin: Links[] = [
    {link: '/admin?chapter=general', name: 'General', Component: AdminWebsite, showRouteDependRole: ['ADMIN', 'MODER']},
    {link: '/admin?chapter=moderators', name: 'Moderators', Component: AdminModerators, showRouteDependRole: ['ADMIN']},
    {link: '/admin?chapter=posts', name: 'Posts', Component: AdminPosts, showRouteDependRole: ['ADMIN', 'MODER']},
    {link: '/admin?chapter=post_chapter', name: 'Post chapters', Component: AdminPostChapter, showRouteDependRole: ['ADMIN', 'MODER']},
    {link: '/admin?chapter=create_post', name: 'Create post', Component: CreatePost, showRouteDependRole: ['ADMIN', 'MODER']},
    {link: '/admin?chapter=add_moderator', name: 'Add moderators', Component: AddModerator, showRouteDependRole: ['ADMIN']},
    {link: '/admin?chapter=page', name: 'Page', Component: AdminPages, showRouteDependRole: ['ADMIN', 'MODER']},
    {link: '/admin?chapter=add_page', name: 'Add page', Component: AdminPagesAdd, showRouteDependRole: ['ADMIN', 'MODER']},
]

