import React from "react";
import { Card, Descriptions, Skeleton, Avatar } from "antd";
import CharacterLink from "./CharacterLink";
import HouseLink from "./HouseLink";
import useFetch from "../hooks/useFetch";
import { getHouseById } from "../services/houseApi";
import { renderArray } from "./shared/helper";

const { Meta } = Card;

const HouseDetail = ({ id, characterLinkMode, houseLinkMode }) => {
  const { payload, loading } = useFetch(getHouseById, id);
  const { data: house } = payload || {};

  return (
    <Card>
      <Skeleton loading={loading} avatar active>
        {house && (
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={house.name || "Unknown"}
          />
        )}
      </Skeleton>
      {house && (
        <Descriptions style={{ paddingTop: 20 }} bordered layout="vertical">
          <Descriptions.Item label="Coat Of Arms" span={2}>
            {house.coatOfArms}
          </Descriptions.Item>
          <Descriptions.Item label="Current Lord">
            {house.currentLord && (
              <CharacterLink
                link={house.currentLord}
                mode={characterLinkMode}
              />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Died Out">
            {house.diedOut}
          </Descriptions.Item>
          <Descriptions.Item label="Words">{house.words}</Descriptions.Item>
          <Descriptions.Item label="Region">{house.region}</Descriptions.Item>
          <Descriptions.Item label="Founded">{house.founded}</Descriptions.Item>
          <Descriptions.Item label="Founder">
            {house.founder && (
              <CharacterLink link={house.founder} mode={characterLinkMode} />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Heir">
            {house.heir && (
              <CharacterLink link={house.heir} mode={characterLinkMode} />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Overlord" span={3}>
            {house.overlord && (
              <HouseLink link={house.overlord} mode={houseLinkMode} />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Sworn Members" span={3}>
            {house.swornMembers &&
              house.swornMembers
                .filter((link) => !!link)
                .map((link, idx) => (
                  <CharacterLink
                    link={link}
                    mode={characterLinkMode}
                    key={idx}
                  />
                ))}
          </Descriptions.Item>
          <Descriptions.Item label="Seats" span={3}>
            {renderArray(house.seats)}
          </Descriptions.Item>
          <Descriptions.Item label="Titles" span={3}>
            {renderArray(house.titles)}
          </Descriptions.Item>
          <Descriptions.Item label="Ancestral Weapons" span={3}>
            {renderArray(house.ancestralWeapons)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};

export default HouseDetail;
