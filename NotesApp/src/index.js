import { HeaderComponent } from './components/header.components'
import { NavigationComponent } from './components/navigation.components';
import { CreateComponent } from './components/create.components';
import { FavoriteComponent } from './components/favorite.components';
import { PostsComponent } from './components/posts.components';
import { LoaderComponent } from './components/loader.components';


new HeaderComponent('header');

const navigation = new NavigationComponent('navigation')
const loader = new LoaderComponent('loader')

const posts = new PostsComponent('posts', { loader })
const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', { loader })


navigation.registerTabs([
    { name: 'create', component: create },
    { name: 'posts', component: posts },
    { name: 'favorite', component: favorite }
])

