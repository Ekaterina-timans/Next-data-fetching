import MainJsonSource from "@/components/gen-json-sources";
import config from '@/components/gen-json-sources/omdb';

export default function JsphPage(){
    return <MainJsonSource config={config} />
}