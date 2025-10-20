import AnnouncementCard from './announcement-card';
import CalendarWidget from './calendar-widget';
import { CategoryFilter } from './category-filter';
import EventCard from './event-card';
import { FileUploader } from './file-uploader';
import OfficerCard from './officer-card';
import PriorityBadge from './priority-badge';
import ResolutionCard from './resolution-card';
import { RichTextEditor } from './rich-text-editor';
import SearchBar from './search-bar';
import StatsCard from './stats-card';
import StatusBadge from './status-badge';

// Export all components for easy importing
export {
    AnnouncementCard,
    CalendarWidget,
    CategoryFilter,
    EventCard,
    FileUploader,
    OfficerCard,
    PriorityBadge,
    ResolutionCard,
    RichTextEditor,
    SearchBar,
    StatsCard,
    StatusBadge,
};

// Component validation - ensure all components are properly typed
const componentValidation = {
    AnnouncementCard,
    CalendarWidget,
    CategoryFilter,
    EventCard,
    FileUploader,
    OfficerCard,
    PriorityBadge,
    ResolutionCard,
    RichTextEditor,
    SearchBar,
    StatsCard,
    StatusBadge,
} as const;

export default componentValidation;