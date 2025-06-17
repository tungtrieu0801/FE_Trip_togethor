import { Dropdown, Button, Space } from "antd";
import {
  LinkOutlined
} from '@ant-design/icons';
export default function ListOptionSend({ options, onSelect }) {

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];
    return (
        <div className="flex items-center justify-center h-full">
            <Dropdown menu={{ items }} placement="topLeft">
                <LinkOutlined className="text-2xl cursor-pointer" />
            </Dropdown>
        </div>
    )
}