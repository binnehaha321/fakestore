import { Select } from "antd";

const { Option } = Select;
const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
];

export function FilterByCategory({ handleCategoryChange }) {
    return (
        <Select
            defaultValue={categories[0]}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={handleCategoryChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {categories.map(category => (
                <Option key={category} value={category}>
                    {category}
                </Option>
            ))}
        </Select>
    );
}