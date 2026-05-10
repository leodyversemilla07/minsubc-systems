import USGController from './USGController'
import PageController from './PageController'
import SearchController from './SearchController'
import Admin from './Admin'
const Controllers = {
    USGController: Object.assign(USGController, USGController),
PageController: Object.assign(PageController, PageController),
SearchController: Object.assign(SearchController, SearchController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers