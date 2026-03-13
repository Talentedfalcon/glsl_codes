#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float random(float num){
    return fract(sin(num)*43758.5453123);
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
    vec2 mouse_correct=clamp(u_mouse.xy/u_resolution.xy,0.3,1.);
    vec3 color=vec3(1.);

    st*=vec2(50.,50.);
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);
    vec2 transform=vec2(random(ipos.y)*mod(u_time,100.)*50.+u_time,0.);
    st-=transform;
    ipos=floor(st);
    fpos=fract(st);

    if(random(ipos)>=mouse_correct.x){
        color-=vec3(solid_rect(fpos,vec2(0.5),1.,0.5));
    }

    gl_FragColor=vec4(color,1.);
}