#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st){
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    float a=dot(random2(ipos),fpos);
    float b=dot(random2(ipos+vec2(1.,0.)),fpos-vec2(1.,0.));
    float c=dot(random2(ipos+vec2(0.,1.)),fpos-vec2(0.,1.));
    float d=dot(random2(ipos+vec2(1.,1.)),fpos-vec2(1.,1.));

    vec2 u=smoothstep(0.,1.,fpos);

    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec2 mouse_correct=u_mouse.xy/u_resolution.xy;
    vec3 color=vec3(0.);

    st*=10.;
    float n=noise(st)+0.5;
    if(n>0.4 && n<0.5){
        color=vec3(1.);
    }
    else{
        color=vec3(0.,0.6,0.8);
    }

    gl_FragColor=vec4(color,1.);
}