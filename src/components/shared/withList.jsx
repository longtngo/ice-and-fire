import { Space } from "antd";

const withList = (Component) => {
  return ({ data, loading }) => {
    let list = [];

    if (loading) {
      list.push(...new Array(3).fill(null));
    } else if (data?.length) {
      list.push(...data);
    }

    return (
      <Space size={[20, 20]} wrap>
        {list.map((item, idx) => (
          <Component key={idx} data={item} loading={loading} />
        ))}
      </Space>
    );
  };
};

export default withList;
