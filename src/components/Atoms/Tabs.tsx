import { useView } from '@/context/ViewContext'

export interface TabProps {
    tabList: TabListProps[]
}

export interface TabListProps {
    name: 'grid' | 'table'
    icon: React.JSX.Element
}

const Tabs = ({ tabList }: TabProps) => {
    const { view, setView } = useView()
    return (
        <div className="flex gap-2 items-center">
            <span>View Type :</span>
            <div role="tablist" className="tabs tabs-border space-x-3!">
                {tabList?.map((tab, index) => (
                    <a
                        onClick={() => setView(tab?.name)}
                        key={index + tab.name}
                        role="tab"
                        className={'tab text-2xl ' + (tab.name === view && 'tab-active')}
                    >
                        {tab.icon}
                    </a>
                ))}
            </div>
        </div>
    )
}
export default Tabs
