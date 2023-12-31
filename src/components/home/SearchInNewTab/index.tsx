'use client';

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/sharp-solid-svg-icons';
import { Tabs } from '@mantine/core';
import classes from './index.module.scss';
import Phind from './Phind';
import Perplexity from './Perplexity';
import YouTube from './Youtube';
import Strings from './Strings';

export default function SearchInNewTab({}) {
  return (
    <Tabs defaultValue="phind" className={classes.container}>
      <Tabs.List className={classes.tabsList}>
        <div className={classes.tabsListOverflow}>
          <Tabs.Tab
            value="phind"
            leftSection={<FontAwesomeIcon icon={faSearch} />}
            className={classes.tab}
          >
            Phind
          </Tabs.Tab>
          <Tabs.Tab
            value="perplexity"
            leftSection={<FontAwesomeIcon icon={faSearch} />}
            className={classes.tab}
          >
            Perplexity
          </Tabs.Tab>
          <Tabs.Tab
            value="youtube"
            leftSection={<FontAwesomeIcon icon={faSearch} />}
            className={classes.tab}
          >
            YouTube
          </Tabs.Tab>
          <Tabs.Tab
            value="strings"
            leftSection={<span className="mr-[-0.25rem]">Format</span>}
            className={classes.tab}
          >
            strings
          </Tabs.Tab>
        </div>
      </Tabs.List>

      <Tabs.Panel value="phind">
        <Phind />
      </Tabs.Panel>

      <Tabs.Panel value="perplexity">
        <Perplexity />
      </Tabs.Panel>

      <Tabs.Panel value="youtube">
        <YouTube />
      </Tabs.Panel>
      <Tabs.Panel value="strings">
        <Strings />
      </Tabs.Panel>
    </Tabs>
  );
}
