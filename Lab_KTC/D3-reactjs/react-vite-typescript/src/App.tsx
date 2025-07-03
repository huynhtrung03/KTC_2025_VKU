
import './App.css'
//bai1
import Button from './components/Button';
import { ArrowRight, Youtube, Facebook, Chrome } from 'lucide-react';

import SearchInput from "./components/SearchInput";
import {MessageCircle, Phone, SearchCheckIcon, SettingsIcon} from "lucide-react";

//bai4
import {ScoreCard} from './components/Hinh4/ScoreCard';
import {MuCard} from './components/Hinh4/MuCard';
import {InfoCard}  from './components/Hinh4/InfoCard';

//bai5
import {Person} from "./components/Hinh5/Person";




function App() {
  return (
    <div className=''>
      <div>
        <Button type='primary'  label='Get Started' rightIcon={<ArrowRight size={20}/>} />
        <Button type='primary' leftIcon={<Youtube size={20}/>} label='Continue with apple'/>
        <Button type='outline' leftIcon={<Chrome size={20}/> } label='Continue with google'/>
        <Button type='outline' leftIcon={<Facebook size={20} />} label='Continue with facebook'/>
      </div>

      <div className="container">
        <SearchInput left_icon={<SearchCheckIcon />} />
        <SearchInput 
          label="Search"
          f_b={false}
          left_icon={<SearchCheckIcon />}
        />
        <SearchInput
          label="Text Field"
          f_b={true}
          left_icon={<SearchCheckIcon />}
        />
        <SearchInput
          label="Search in the web"
          f_b={false}
          left_icon={<SearchCheckIcon />}
          right_icon={<MessageCircle />}
        />
        <SearchInput
          label="Search Crypto"
          f_b={false}
          left_icon={<SearchCheckIcon />}
          right_icon={<SettingsIcon />}
        />
        <SearchInput
          label="Phone Number"
          f_b={false}
          right_icon={<Phone />}
          bg="green"
          border_icon="rec"
        />
        <SearchInput
          label="Search in the web"
          f_b={false}
          left_icon={<SearchCheckIcon />}
          right_icon={<MessageCircle />}
          bg="yellow"
        />
      </div>

      <div className="container">
        <ScoreCard />
        <MuCard />
        <InfoCard />
      </div>

      <div className="d">
        <Person
          bgCorlor="#00CFE8"
          avatarUrls={["images/avatar.png"]}
          title="Miriam Jimenez"
        />
        <Person
          bgCorlor="#933FFE"
          avatarUrls={[
            "images/avatar.png",
            "images/avatar.png",
            "images/avatar.png",
          ]}
          title="Teams"
          subtitle="Two currently"
        />

        <Person
          bgCorlor="#FEEB00"
          avatarUrls={[
            "images/avatar.png", 
            "images/avatar.png"]}
          title="New Teams"
        />
      </div>
      
    </div>
  );
}

export default App;




