import * as React from 'react';
import styles from './card.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function CustomCard({ title, subtitle, children }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <div className={styles.title}>{title}<label className={styles.subtitle}>{subtitle}</label></div>
        {children}
      </CardContent>
    </Card>
  )
}

export default CustomCard