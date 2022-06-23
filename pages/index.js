import * as React from 'react';
import { client } from "../libs/client";
import Box from '@mui/material/Box';
import Card from '../components/Molecules/card';
import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid';
import ResumeTable from '../components/Organisms/resume_table';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

function getSkillLevelIcon(order) {
  switch(order){
    case 1:
      return <StarIcon/>
    case 2:
      return <StarHalfIcon/>
    case 3:
      return <StarBorderIcon/>
  }
  return;
}

export default function Home({profile, resume, category, level, skills, products}) {
  return (
    <>
      <Typography variant="h2" align="center">{profile.name}</Typography>
      <div dangerouslySetInnerHTML={{ __html: profile.about_site }}></div>
      <div id="resume">
        <Card title="RESUME" subtitle="職務経歴">
          <ResumeTable resume={resume}></ResumeTable>
        </Card>
      </div>
      <div id="skill">
        <Card title="SKILL" subtitle="技術">
          <div dangerouslySetInnerHTML={{ __html: profile.about_skill }}></div>
          <div style={{ 'margin-bottom': '30px' }}>
            {level.map((item) => (
              <Chip
                icon={getSkillLevelIcon(item.order)}
                label={item.name}
                size="small"
                style={{ margin: '3px' }}
                />
            ))}
          </div>
          {category.map((item) => (
            <>
              <Typography variant="h6">{item.name}</Typography>
              <div style={{ 'margin-bottom': '15px' }}>
                {skills[item.name].map((skill) => (
                  <Chip
                    icon={getSkillLevelIcon(skill.level.order)}
                    size="small"
                    label={skill.name}
                    variant="outlined"
                    style={{ margin: '3px' }}
                  />
                ))}
              </div>
            </>
          ))}
        </Card>
      </div>
      <div id="product">
        <Card title="PRODUCT" subtitle="制作物">
          <div dangerouslySetInnerHTML={{ __html: profile.about_product }}></div>
          {products.map((product) => (
            <Box sx={{ flexGrow: 2 }}>
              <Grid container spacing={2}>
                <Grid container item xs={12} sm={3} justifyContent="center" alignItems="center">
                  <img src={product.image.url}></img>
                </Grid>
                <Grid item xs={12} sm={9} justifyContent="center" alignItems="center">
                  <Typography variant="h6">{product.title}</Typography>
                  <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                  <Chip
                    avatar={<GitHubIcon></GitHubIcon>}
                    label="GitHub"
                    component="a"
                    href={product.url_src}
                    variant="outlined"
                    clickable
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Card>
      </div>
      <div id="about-me">
        <Card title="ABOUT ME" subtitle="プロフィール">
          <Box sx={{ flexGrow: 2 }}>
            <Grid container spacing={2}>
              <Grid container item xs={12} sm={3} justifyContent="center" alignItems="center">
                <img src={profile.icon.url}></img>
              </Grid>
              <Grid item xs={12} sm={9} justifyContent="center" alignItems="center">
                <div dangerouslySetInnerHTML={{ __html: profile.about_me }}></div>
                <Chip
                  avatar={<GitHubIcon></GitHubIcon>}
                  label="GitHub"
                  component="a"
                  href={profile.url_github}
                  variant="outlined"
                  clickable
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </div>
    </>
  )
}

function classifySkill(skills) {
  var cSkill = {}
  for(var i=0; i<skills.length; i++) {
    if(!cSkill[skills[i].category.name]){
      cSkill[skills[i].category.name] = [];
    }
    cSkill[skills[i].category.name].push(skills[i]);
  }
  Object.keys(cSkill).forEach(function (key) {
    cSkill[key].sort((a, b) => {
      return a.level.order - b.level.order;
    })
  })

  return cSkill
}

export async function getStaticProps() {
  const profile = await client.get({ endpoint: 'profile' });
  const resume = await client.get({ endpoint: 'resume' });
  const skillCategory = await client.get({ endpoint: 'skill-category', queries: {fields: 'name'}  });
  const skillLevel = await client.get({ endpoint: 'skill-level' });
  const skill = await client.get({ endpoint: 'skill', queries: {limit: 100, fields: 'id,category,name,level'} });
  const product = await client.get({ endpoint: 'product' });

  return {
    props: {
      profile: profile,
      resume: resume.contents,
      category: skillCategory.contents,
      level: skillLevel.contents,
      skills: classifySkill(skill.contents),
      products: product.contents,
    },
  };
}